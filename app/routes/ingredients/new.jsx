import { redirect, Form } from 'remix';
import { createIngredient } from '../../remoteApi';

export const action = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const price = formData.get('price');
  const volume = formData.get('volume');

  await createIngredient({ name, price, volume });

  return redirect('/ingredients');
};
export const loader = async ({ request }) => {
  return {};
};

export default function NewIngredient() {
  return (
    <Form method="post">
      <p>
        <label>
          Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Price: <input type="number" name="price" />
        </label>
      </p>
      <p>
        <label>
          Volume: <input type="number" name="volume" />
        </label>
      </p>
      <p>
        <button type="submit">Create Ingredient</button>
      </p>
    </Form>
  );
}
