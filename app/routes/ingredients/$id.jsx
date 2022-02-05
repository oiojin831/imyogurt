import { useLoaderData, useCatch, redirect, useParams } from 'remix';
import { supabase } from '../../libs/supabase.js';

export const loader = async ({ params }) => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('id, name')
    .eq('id', params.id);
  if (!ingredient) {
    throw new Response('What a joke! Not found.', {
      status: 404,
    });
  }
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const { data, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .eq('id', params.id);
    if (!data) {
      throw new Response("Can't delete what does not exist", { status: 404 });
    }
  }
  await supabase.from('ingredients').delete().eq('id', params.id);
  return redirect('/ingredients');
};

export default function IngredientRoute() {
  const data = useLoaderData();

  return <div>hello</div>;
}
