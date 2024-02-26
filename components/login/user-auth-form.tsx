'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as React from "react"
import * as z from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Form, FormField } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { errorMessage } from "@/error.message.enum"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default function UserAuthForm() {

  const formLogin = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const router = useRouter()
  const { toast } = useToast()

  const isLoading = formLogin.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/v1/auth/login", {
        ...values
      })
      router.push("/dashboard")
      formLogin.reset()
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente",
      })

    } catch (error: any) {
      const errorCode = error.response.data.code as string
      const message = errorMessage[errorCode] || "Consulte con el administrador del sistema"
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <Form {...formLogin}>
        <form onSubmit={formLogin.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={formLogin.control}
              name="email"
              render={({ field }) => (
                <div className="grid gap-1">
                  <Input
                    placeholder="usuario@gmail.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              )}
            />
            <FormField
              control={formLogin.control}
              name="password"
              render={({ field }) => (
                <div className="grid gap-1">
                  <Input
                    placeholder="**********"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ingresar
            </Button>
          </div>

        </form>

      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O CONTINUA CON GOOGLE
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}