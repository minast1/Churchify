// app/services/auth.server.ts
import { Denomination, Role, User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { login, register } from "~/controllers/membersController";
import { adminlogin } from "~/controllers/adminController";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<Omit<User, "password">>(sessionStorage, {
    throwOnError : true
});


authenticator.use(
   new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
       let password = form.get("password") as string;
       let name = form.get("name") as string;
       let denomination = form.get("denomination") as Denomination;
       let role = form.get("role") as Role;
       let formId = form.get("__rvfInternalFormId") as string;
    
       const user: Omit<User, "password"> =
           formId === "member_signup" ? await register({ email, password, denomination, role, name }) : await login({ email, password });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
  ///ADMIN AUTHENTICATOR 
  
authenticator.use(  
   new FormStrategy(async ({ form }) => {
    let email = form.get("email") as string;
       let password = form.get("password") as string;
       
       const user: Omit<User, "password"> = await adminlogin({ email, password });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "admin-pass"
);