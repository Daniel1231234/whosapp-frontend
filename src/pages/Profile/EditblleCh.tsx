import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useEditableControls, ButtonGroup, IconButton, Editable, Tooltip, EditablePreview, useColorModeValue, Input, EditableInput, TagLabel } from "@chakra-ui/react";


type Props = {
    val:string
    onChange:any
    label:any

}
export function EditblleCh({val, onChange, label}:Props) {

  return (
      <Editable
        defaultValue={val}
        display="flex"
        alignItems="center"
        flexDir="column"
        isPreviewFocusable={true}
        selectAllOnFocus={false}
        onChange={onChange}
      >

        <label style={{fontWeight:'600', color:'darkblue'}}>{label}</label> 
        <Tooltip label="Click to edit">
          <EditablePreview
            py={2}
            px={4}
            _hover={{
              background: useColorModeValue("gray.100", "gray.700")
            }}
          />
        </Tooltip>
        <Input py={2} px={4} as={EditableInput} />
        <EditableControls />
      </Editable>
  );
}

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton aria-label='Check' icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton aria-label='Cancel'
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }