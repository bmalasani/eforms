import { FormField } from '.';
import { Fields } from './Fields';
import Outer from './Outer';

type DesignerProps = {
  field: FormField;
  children?: any;
  control?: any;
  onSaveField?: (fc: FormField[], isEdit?: boolean, isRemove?: boolean) => any;
};

function Designer({ field, children, control, onSaveField }: DesignerProps) {
  const handleOnSave = (fc: FormField[], isEdit?: boolean, isRemove?: boolean) => {
    onSaveField && onSaveField(fc, isEdit, isRemove);
  };
  const canAdd = Fields[field.type].childrenTypes && Fields[field.type].childrenTypes.length > 0;
  const renderComponentWithOuterLayer = () => {
    switch (field.type) {
      case 'column':
        const outerchildren = (
          <Outer onSaveField={handleOnSave} disableActions={!canAdd} field={field} editable>
            {children}
          </Outer>
        );
        return (
          Fields[field.type].component &&
          Fields[field.type].component!({ children: outerchildren, control, ...field.props })
        );
      default:
        return (
          <Outer
            onSaveField={handleOnSave}
            field={field}
            disableActions={!canAdd}
            editable={field.type != 'main'}
          >
            {Fields[field.type].component &&
              Fields[field.type].component!({ children, control, ...field.props })}
          </Outer>
        );
    }
  };
  return <>{renderComponentWithOuterLayer()}</>;
}

export default Designer;
