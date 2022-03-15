import {
  Form,
  redirect,
  unstable_parseMultipartFormData,
  useActionData,
} from "remix";
import type { ActionFunction } from "remix";
import { supabase } from "../../libs/supabase.js";

export const action: ActionFunction = async ({ request }) => {
  try {
    const uploadHandler = async ({
      name,
      stream,
      filename,
    }: {
      name: any;
      stream: any;
      filename: any;
    }) => {
      if (name !== "menus") {
        stream.resume();
        return;
      } else {
        console.log(name, filename);
      }

      const chunks = [];

      for await (const chunk of stream) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filename, buffer);

      if (error) {
        throw error;
      }
      return JSON.stringify({ data });
    };

    const form = await unstable_parseMultipartFormData(request, uploadHandler);
    const fileInfo = JSON.parse(JSON.stringify(Object.fromEntries(form)));

    return JSON.parse(fileInfo.menus);
  } catch (e) {
    console.log("action error", e);
    return { error: e };
  }
};

export default function MenuImages() {
  const actionData = useActionData();

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="menus-input">Avatar</label>
        <input type="file" name="menus" id="menus-input" />
        <button type="submit">업로드</button>
      </Form>
      {console.log(actionData)}
      <div>{actionData?.error ? actionData?.error?.message : null}</div>
      <div>
        {actionData?.data ? `File Uploaded: ${actionData?.data?.Key}` : null}
      </div>
    </>
  );
}
