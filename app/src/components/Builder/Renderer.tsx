import { FormField } from '.';
import { Fields } from './Fields';
import Outer from './Outer';

type RendererProps = {
  field: FormField;
  children?: any;
  isDesign?: boolean;
  control?: any;
  onSaveField?: (fc: FormField[], isEdit?: boolean, isRemove?: boolean) => any;
};

function Renderer({ field, children, isDesign, control, onSaveField }: RendererProps) {
  console.log(field, children, control);
  const handleOnSave = (fc: FormField[], isEdit?: boolean, isRemove?: boolean) => {
    onSaveField && onSaveField(fc, isEdit, isRemove);
  };
  const OuterApply = () => {
    switch (field.type) {
      // case 'main':
      // case 'row':
      // case 'column':
      //   const outerChildren = (
      //     <Outer onSaveField={handleOnSave} field={field} editable={field.type !== 'main'}>
      //       {children}
      //     </Outer>
      //   );
      //   return (
      //     <>
      //       {Fields[field.type].component &&
      //         Fields[field.type].component!({ children: outerChildren, ...field.props })}
      //     </>
      //   );
      default:
        return (
          <Outer onSaveField={handleOnSave} field={field} editable={field.type !== 'main'}>
            {Fields[field.type].component &&
              Fields[field.type].component!({ children, control, ...field.props })}
          </Outer>
        );
    }
  };

  const renderComponent = () =>
    Fields[field.type].component &&
    Fields[field.type].component!({ children, control, ...field.props });

  return <>{isDesign ? OuterApply() : renderComponent()}</>;
}

export default Renderer;
