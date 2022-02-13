import { redirect } from 'remix';
import type { LoaderFunction, ActionFunction } from 'remix';

import { ValidatedForm, validationError } from 'remix-validated-form';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { FormInput, SubmitButton } from '../../components/Form';
import { createIngredient } from '../../remoteApi.js';
import type { Ingredient } from '../../remoteApi.js';

export const validator = withZod(
  z.object({
    name: z.string().nonempty('재료 이름을 써주세요'),
    price: zfd.numeric(z.number().gte(0, { message: '0원 이상이여야합니다.' })),
    volume: zfd.numeric(
      z.number().gte(0, { message: '0 g/ml 이상이여야합니다.' })
    ),
  })
);

// action은 서버에서만 실행된다.
export const action: ActionFunction = async ({ request }) => {
  const result = await validator.validate(await request.formData());
  if (result.error) {
    // validationError comes from `remix-validated-form`
    return validationError(result.error);
  }

  await createIngredient(result.data);

  return redirect('/ingredients');
};
export const loader: LoaderFunction = async ({ request }) => {
  return {};
};

export default function NewIngredient() {
  return (
    <ValidatedForm validator={validator} method="post">
      <FormInput name="name" label="이름" />
      <FormInput name="price" label="가격(원)" />
      <FormInput name="volume" label="양(ml, g)" />
      <SubmitButton />
    </ValidatedForm>
  );
}
