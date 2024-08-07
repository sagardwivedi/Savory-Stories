import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"

import { type UserCreate, registerUser } from "@/client"
import { toast } from "@/components/ui/use-toast"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signUpMutation = useMutation({
    mutationFn: (data: UserCreate) => registerUser({ body: data }),
    onSuccess: () => {
      toast({
        title: "Account created.",
        description: "Your account has been created successfully.",
      })
      navigate({ to: "/auth/login" })
    },
    onError: (err) => {
      console.error("Account creation error:", err);
      toast({ title: "Something went wrong.", description: err.message })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    signUpMutation,
  }
}

export default useAuth
export { isLoggedIn }
