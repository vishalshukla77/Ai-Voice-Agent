import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string()
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim();

    const userData = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), email))
      .collect();

    if (userData.length === 0) {
      const data = {
        name,
        email,
        credits: 50000
      };

      const result = await ctx.db.insert("users", data);
      console.log("New user inserted:", result);
      return result;
    }

    console.log("User already exists:", userData[0]);
    return userData[0];
  }
});
