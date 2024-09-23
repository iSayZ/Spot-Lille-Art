import myAxios from "./myAxios";

async function CheckUserStatut(auth) {
    const { account, token } = auth
    if (account.assignment === "user") {     
        try {
            await myAxios.get(`/api/members/${account.id_member_fk}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })
            return null
        } catch (error) {            
            return error.response.data
        }  
    } else {
        return null
    } 
}

export default CheckUserStatut;