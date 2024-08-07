import { db } from "../database/db"
import { eq } from 'drizzle-orm'
import { cas_validate_url, service_url } from "../utils/secret";
import { JSDOM } from 'jsdom';

export const validateCASTicket = async (ticket : string) => {
    try {
        const validateUrl = `${cas_validate_url}?service=${encodeURIComponent(service_url)}&ticket=${ticket}`;
        const response = await fetch(validateUrl);
        if (response.ok) {
            const text = await response.text();
            console.log("====================validateCASTicket")
            console.log(text)
            console.log("validateCASTicket====================")
            const isValid = text.includes("authenticationSuccess");
            if (isValid) {
              // User is authenticated
                return await parseUsernameFromCASResponse(text);
            } else {
              console.error("CAS ticket validation failed");
            }
          } else {
            console.error("Failed to validate CAS ticket");
          }
        }catch (error) {
            throw new Error("Failed to fetch CAS. Please try again later.");
    }
}

function parseUsernameFromCASResponse(response: string) {
    const dom = new JSDOM(response, { contentType: "application/xml" });
    const document = dom.window.document;
    const authSuccessNode = document.getElementsByTagName("cas:authenticationSuccess")[0];
    if (authSuccessNode) {
      const attributesNode = authSuccessNode.getElementsByTagName("cas:attributes")[0];
      if (attributesNode) {
        return {
          uid: attributesNode.getElementsByTagName("cas:uid")[0]?.textContent,
          email: attributesNode.getElementsByTagName("cas:mail")[0]?.textContent,
          sn: attributesNode.getElementsByTagName("cas:sn")[0]?.textContent,
          givenName: attributesNode.getElementsByTagName("cas:givenName")[0]?.textContent,
        };
        }
    }
}

  
  function establishSession(username: string) {
    // Implement session establishment logic here
    console.log(`User ${username} is authenticated`);
  }