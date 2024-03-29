import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Streams } from "@prisma/client";
import { useRouter } from "next/router";
import { format } from "path";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm{
  name:string;
  price:string;
  description:string;
}

interface CreatResponse{
  ok:boolean;
  stream:Streams;
}

function Create() {
  const router = useRouter();
  const [createStream, {loading, data}] = useMutation<CreatResponse>(`/api/streams`);
  const {register,handleSubmit} = useForm<CreateForm>();
  const onValid = (form:CreateForm) =>{
    if(loading) return;
    createStream(form);
  }
  useEffect(()=>{
    if(data && data.ok){
      router.push(`/streams/${data.stream.id}`);
    }
  },[data,router]);
  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input register={register("name", {required:true})} required label="Name" name="name" type="text" />
        <Input
          register={register("price", {required:true, valueAsNumber:true})}
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea register={register("description",{required:true})} name="description" label="Description" />
        <Button loading={loading} text="Go live" />
      </form>
    </Layout>
  );
}

export default Create;
