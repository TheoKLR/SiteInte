import { api } from '../api';

export const addToTeam = async (userIds: number[], teamId: number) => {
    return await api.put('user/addtoteam', {
        userIds,
        teamId,
    })
}

export const getUserLight = async () => {
    let response = await api.get('user/all/light')
    return response.data
}

export const changePermission = async (id: number, perm: string) => {
    return await api.put('user/permission', {
        id,
        perm,
    })
}

export const setBusData = async (lines: any[]) => {
    return await api.post('user/setBusData', {
        lines
    })
}

export const updateUser = async (branch: string, contact: string, discord_id: string) => {
    return await api.put('user/updateuser', {
        branch,
        contact,
        discord_id
    })
}

export const getCurrentUser = async () => {
    const response = await api.get("user/current")
    return response?.data.data ;
};

export const getBusAttribution = async () => {
    const response = await api.get("user/busAttribution")
    return response?.data.data ;
};


export const getUsersbyTeam = async (teamId : number) => {
    const response = await api.get("user/getbyteam/"+teamId)
    return response?.data.data ;
};

export const modifyUserTeam = async (members: [], teamId: number[]) => {
    return await api.post("user/modifyteam", {
      members,
      teamId
    });
  };

  export const deleteUser = async (id: number) => {
    const response = await api.delete("user/delete/"+id)
    return response ;
};

export const getAllByPermission = async (permission : string) => {
    const response = await api.get(`user/allbypermission/${permission}`);
    return response?.data.data ;
};

export const getAllBusAttributionByBus = async () => {
    const response = await api.get(`user/getBusAttributionByBus`);
    return response.data.data;
};

export const isInRiList = async (email : string) => {
    const response = await api.get(`user/isinrilist/${email}`);
    return response?.data.data ;
};