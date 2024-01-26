import { RoomProvider, useMutation, useOthers, useStatus } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Page() {
  return (
    <RoomProvider id="my-new-room-id" initialPresence={{}}>
      <ClientSideSuspense fallback={"load"}>
        {() => <Mutations />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function Mutations() {
  const status = useStatus()
  const others = useOthers()
  const mutate = useMutation(({ storage }) => {
    console.log("run")
  }, [])

  return(
    <div>
      <button onClick={() => mutate("hello")}>click</button>
      <div>status: {status}</div>
      <div>{others.length} others are online</div>
    </div>
  );
}






export async function getStaticProps() {
  const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
  const API_KEY_WARNING = process.env.CODESANDBOX_SSE
    ? `Add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` secret in CodeSandbox.\n` +
      `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#codesandbox.`
    : `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
      `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-live-avatars#getting-started.`;

  if (!API_KEY) {
    console.warn(API_KEY_WARNING);
  }

  return { props: {} };
}
