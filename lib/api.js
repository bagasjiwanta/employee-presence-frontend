class Api {
    url = "http://20.2.82.101"
    secret = "REKSTI"
    
    login = async (email, password) => {
        try {
            const { body } = await fetch(url, {
                method: "POST",
                body: {
                    email,
                    password
                }
            })
            return {
                data: body.token,
                error: null
            }
        } catch (err) {
            return {
                data: null,
                error: err
            }
        }
    }

    presence = async (image, long, lat, token) => {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("long", long)
        formData.append("lat", lat)
        formData.append("token", token)
        try {
            const response = await fetch(`${url}/presence`, {
                method: "POST",
                body: formData
            })
            return {
                data: response.body,
                error: null
            }
        } catch (err) {
            return {
                data: null,
                error: err
            }
        }
    }

    checkStatus = async (token) => {
        try {
            const response = await fetch(`${url}/status`, {
                body: {
                    token
                }
            }) 
            return {
                data: response.body,
                error: null
            }
        } catch (err) {
            return {
                data: null,
                error: err
            }
        }
    }
}

export default new Api()