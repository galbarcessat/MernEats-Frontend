import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
    auth0Id: string,
    email: string
}

export function useCreateMyUser() {
    const { getAccessTokenSilently } = useAuth0()
    const {
        mutateAsync: createUser,
        isLoading,
        isError,
        isSuccess
    } = useMutation(createMyUserRequest)

    async function createMyUserRequest(user: CreateUserRequest) {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        console.log('response:', response)
        if (!response.ok) {
            throw new Error("Failed to create user")
        }
    }

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    }
}

type updateMyUserRequest = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}

export function useUpdateMyUser() {
    const { getAccessTokenSilently } = useAuth0()

    async function updateMyUserRequest(formData: updateMyUserRequest) {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })

        if (!response.ok) {
            throw new Error("Failed to update user")
        }

        return response.json()
    }

    const { mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset } = useMutation(updateMyUserRequest)

    if (isSuccess) {
        toast.success("User profile updated!")
    }

    if (error) {
        toast.error(error.toString())
        reset()
    }
    
    return {
        updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    }
}