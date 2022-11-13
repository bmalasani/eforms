import { FormField } from '.';
import { Fields } from './Fields';

type RendererProps = {
  field: FormField;
  children?: any;
  control?: any;
};

function FieldRenderer({ field, children, control }: RendererProps) {
  const renderComponent = () =>
    Fields[field.type].component &&
    Fields[field.type].component!({ children, control, ...field.props });

  return <>{renderComponent()}</>;
}

function Renderer({ field, control }: RendererProps) {
  const renderChildren = (formField: FormField, key?: string | number) => (
    <FieldRenderer control={control} field={formField} key={key}>
      <>
        {formField.children &&
          formField.children.map((subField, i) => {
            return renderChildren(subField, `${subField.key || ''}${i}`);
          })}
      </>
    </FieldRenderer>
  );

  return <>{renderChildren(field)}</>;
}

export default Renderer;
