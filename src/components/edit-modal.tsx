import { useEffect } from 'react'
// components
import { Modal, Flex, Form, Input, Select } from 'antd'
// types
import type { FC, FormValues, EditModalProps } from '../types'
// utils + config
import { getDefaultJson, getFormattedData } from '../utils'
import {
    formItems,
    defaultJson,
    addFormItems,
    statusOptions,
} from '../config'


const FormItem = Form.Item
const midpoint = Math.ceil(formItems.length / 2)
const editLeftColumnItems = formItems.slice(0, midpoint)
const editRightColumnItems = formItems.slice(midpoint)
const addMidpoint = Math.ceil(addFormItems.length / 2)
const addLeftColumnItems = addFormItems.slice(0, addMidpoint)
const addRightColumnItems = addFormItems.slice(addMidpoint)

export const EditModal: FC<EditModalProps> = ({
    add,
    edit,
    order,
    ticket,
    isAdding,
    isModalOpen,
    setIsModalOpen,
}) => {
    const [form] = Form.useForm()
    const modalColumns = isAdding
        ? [addLeftColumnItems, addRightColumnItems]
        : [editLeftColumnItems, editRightColumnItems]
    const initialFormValues = isAdding ? { ...getDefaultJson(order).tickets[0] } : { ...ticket }
    const formKey = isAdding ? `add-${order}` : `edit-${ticket.ticketId}`

    const hydrateForm = () => {
        form.resetFields()
        form.setFieldsValue(initialFormValues)
    }

    useEffect(() => {
        if (!isModalOpen) {
            return
        }

        hydrateForm()
    }, [form, initialFormValues, isModalOpen])

    const syncFormattedFields = async () => {
        const requiredFieldNames = (isAdding ? addFormItems : formItems)
            .filter((item) => item.rules.some((rule) => rule.required))
            .map((item) => item.name)

        if (requiredFieldNames.length === 0) {
            return
        }

        try {
            const values = await form.validateFields(requiredFieldNames, {
                validateOnly: true,
            }) as { ticketId?: string, ticketTitle?: string }
            const ticketId = values.ticketId ?? form.getFieldValue('ticketId')
            const ticketTitle = values.ticketTitle ?? form.getFieldValue('ticketTitle')

            if (!ticketId || !ticketTitle) {
                return
            }

            form.setFieldsValue(getFormattedData(ticketTitle, ticketId))
        } catch {
            console.warn('Required fields are not valid yet, skipping formatted data sync.')
        }
    }

    const ok = (formValues: FormValues) => {
        if (Object.values(formValues).some(value => value !== undefined)) {
            const definedValues = Object.fromEntries(
                Object
                    .entries(formValues)
                    .filter(([_, value]) => value !== undefined)
            )

            if (isAdding) {
                add({ ...getDefaultJson(order).tickets[0], ...definedValues })
            } else {
                edit({ ...ticket, ...definedValues })
            }
        }
        setIsModalOpen(false)
    }

    const cancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Modal
            key={formKey}
            title={isAdding ? `Create Ticket #${order}` : `Edit Ticket: ${ticket.ticketId}`}
            closable={{ 'aria-label': 'Close' }}
            open={isModalOpen}
            onCancel={cancel}
            afterOpenChange={(open) => {
                if (open) {
                    hydrateForm()
                }
            }}
            okText={isAdding ? 'Create' : 'Save'}
            cancelText="Cancel"
            centered
            destroyOnHidden
            okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
            width={{
                xs: '90%',
                sm: '80%',
                md: '70%',
                lg: '60%',
                xl: '50%',
                xxl: '40%',
            }}
            modalRender={(dom) => (
                <Form
                    key={formKey}
                    layout="horizontal"
                    form={form}
                    name="ticket-editor"
                    initialValues={initialFormValues}
                    clearOnDestroy
                    onValuesChange={(changedValues) => {
                        if ('ticketId' in changedValues || 'ticketTitle' in changedValues) {
                            void syncFormattedFields()
                        }
                    }}
                    onFinish={ok}
                >
                    {dom}
                </Form>
            )}
        >
            <Flex gap="middle" align="start" justify="space-between" wrap>
                {modalColumns.map((columnItems, columnIndex) => (
                    <Flex
                        key={columnIndex}
                        vertical
                        gap="small"
                        style={{ flex: 1, minWidth: 280 }}
                    >
                        {columnItems.map((item) => (
                            <FormItem
                                key={item.name}
                                name={item.name}
                                label={item.label}
                                rules={item.rules}
                                style={{ marginBottom: 0 }}
                                validateTrigger="onBlur"
                            >
                                {item.rules.length > 0
                                    ? (
                                        <Input
                                            type="text"
                                            allowClear
                                            readOnly={item.readonly}
                                        />
                                    )
                                    : (
                                        <Select
                                            options={statusOptions}
                                        />
                                    )}
                            </FormItem>
                        ))}
                    </Flex>
                ))}
            </Flex>
        </Modal>
    )
}
