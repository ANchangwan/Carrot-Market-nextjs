import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Streams } from "@prisma/client";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessages extends Streams {
  Message: StreamMessage[];
}

interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };
  useEffect(() => {
    if (sendMessageData && sendMessageData.ok) {
      mutate();
    }
  }, [sendMessageData, mutate]);
  return (
    <Layout canGoBack>
      <div className="py-10 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="text-2xl block mt-3 text-gray-900">
            {data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {data?.stream.Message.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex relative mx-auto max-w-md w-full items-center"
            >
              <input
                type="text"
                {...register("message", { required: true })}
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
