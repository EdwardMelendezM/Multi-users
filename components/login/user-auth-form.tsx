"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as React from "react"
import * as z from 'zod'
import axios from "axios"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Form, FormField } from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const formLogin = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = formLogin.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/v1/auth/login", {
        ...values
      })
      formLogin.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
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