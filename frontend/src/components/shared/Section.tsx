import './Section.css';

export interface SectionProps {
    titre: string;
    contenu : React.FunctionComponent;
}

// La rubrique est le composant central du front end du site
// Elle isole une partie du site et se personnalise avec un titre et un contenu (qui est un composant également)
export const Section: React.FC<SectionProps> = ({titre, contenu: Contenu}) => {
    return (
        <>
            <div className='container'>
                <div className='titre'>
                    <h2>{titre}</h2>
                    <hr />
                </div>
                <div className='contenu'>
                    <Contenu/>
                </div>
            </div>

        </>
    )
}