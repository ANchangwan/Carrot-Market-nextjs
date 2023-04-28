import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (data: LoginForm) => {
    console.log("im valid");
    console.log(data, "data");
  };

  console.log(errors.email?.message);

  return (
    <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onValid)}>
      <input
        placeholder="email"
        {...register("email", {
          required: "email. is required",
          validate: {
            notGmail: (values) =>
              !values.includes("@gmail.com") || "gmail is not allowed",
          },
        })}
        type="email"
      />
      <input
        className="border border-orange-400 bg-orange-600 py-6"
        type="submit"
        value="click me"
      />
    </form>
  );
}
