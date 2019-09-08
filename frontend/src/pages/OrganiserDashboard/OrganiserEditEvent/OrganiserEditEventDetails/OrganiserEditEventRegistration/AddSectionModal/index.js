import React, { useState, useCallback, useEffect } from 'react';

import { Modal, Radio, Input } from 'antd';

import FormFieldLabel from 'components/FormComponents/FormFieldLabel';
import FormFieldHint from 'components/FormComponents/FormFieldHint';
import MarkdownInput from 'components/FormComponents/MarkdownInput';
import Divider from 'components/generic/Divider';

const AddSectionModal = ({ visible, onVisibleChange, onSubmit, onEditDone, onEditCancel, editing, reservedNames }) => {
    const [data, setData] = useState({});
    const [isConditional, setIsConditional] = useState(false);

    useEffect(() => {
        if (editing) {
            setData(editing);
            setIsConditional(typeof editing.conditional !== undefined);
        }
    }, [editing]);

    const reset = () => {
        setData({});
        setIsConditional(false);
    };

    const validate = () => {
        if (!data.label) {
            return 'Please give your section a title';
        }

        if (!data.name) {
            return 'Please give your section a machine name';
        }

        if (!editing) {
            if (reservedNames.indexOf(data.name) !== -1) {
                return `The machine-name ${data.name} is already taken, please use something else`;
            }
        }

        if (isConditional && !data.conditional) {
            return 'Please give your section a conditional question, or set it to always visible';
        }
    };

    const handleAdd = () => {
        const error = validate();
        if (error) {
            window.alert(error);
        } else {
            onSubmit({
                ...data,
                conditional: isConditional ? data.conditional : undefined
            });
            onVisibleChange(false);
            reset();
        }
    };

    const handleEdit = () => {
        const error = validate();
        if (error) {
            window.alert(error);
        } else {
            onEditDone({
                ...data,
                conditional: isConditional ? data.conditional : undefined
            });
            reset();
        }
    };

    const handleCancel = () => {
        if (editing) {
            onEditCancel();
        } else {
            onVisibleChange(false);
        }
    };

    const handleChange = useCallback(
        (field, value) => {
            setData({
                ...data,
                [field]: value
            });
        },
        [data]
    );

    return (
        <Modal
            title={editing ? `Edit ${editing.label}` : 'Add a new section'}
            visible={visible || editing}
            onOk={editing ? handleEdit : handleAdd}
            onCancel={handleCancel}
            destroyOnClose={true}
            maskClosable={false}
            centered={true}
        >
            <FormFieldLabel label="Section name" required show />
            <FormFieldHint hint="The name of your section" show />
            <Divider size={1} />
            <Input
                placeholder="Section title"
                size="large"
                value={data.label}
                onChange={e => handleChange('label', e.target.value)}
            />
            <Divider size={2} />
            <FormFieldLabel label="Machine name" required show />
            <FormFieldHint hint="A machine-readable name for the section" show />
            <Divider size={1} />
            <Input
                disabled={editing}
                placeholder="mySectionName"
                size="large"
                value={data.name}
                onChange={e => handleChange('name', e.target.value)}
            />
            <Divider size={2} />
            <FormFieldLabel label="Description" show />
            <FormFieldHint hint="A longer description for what this section is about, if needed" show />
            <Divider size={1} />
            <MarkdownInput value={data.description} onChange={e => handleChange('description', e.target.value)} />
            <Divider size={2} />
            <FormFieldLabel label="Visibility" show />
            <FormFieldHint
                hint="Do you want this section to be visible always, or have the user answer a yes/no question to expand it?"
                show
            />
            <Divider size={1} />
            <Radio.Group
                value={isConditional}
                onChange={e => setIsConditional(e.target.value)}
                defaultValue={false}
                buttonStyle="solid"
            >
                <Radio.Button value={false}>Always show</Radio.Button>
                <Radio.Button value={true}>Conditionally</Radio.Button>
            </Radio.Group>

            {isConditional && (
                <React.Fragment>
                    <Divider size={2} />
                    <FormFieldLabel label="Conditional question" required show />
                    <FormFieldHint
                        hint="What is the yes/no question you want to ask? When choosing yes, the questions in this section will be shown"
                        show
                    />
                    <Divider size={1} />
                    <Input
                        placeholder="E.g. do you want to apply to Terminal?"
                        size="large"
                        value={data.conditional}
                        onChange={e => handleChange('conditional', e.target.value)}
                    />
                </React.Fragment>
            )}
        </Modal>
    );
};

export default AddSectionModal;
