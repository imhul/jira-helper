// components
import { Modal, Flex, Form, Input, Select } from 'antd'
// types
import type { FC, FormValues, EditModalProps } from '../types'
// utils + config
import { formItems, statusOptions, defaultJson } from '../config'


const FormItem = Form.Item
const midpoint = Math.ceil(formItems.length / 2)
const leftColumnItems = formItems.slice(0, midpoint)
const rightColumnItems = formItems.slice(midpoint)

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

    const ok = (formValues: FormValues) => {
        console.info('Form values on submit: ', formValues)

        if (Object.values(formValues).some(value => value !== undefined)) {
            const definedValues = Object.fromEntries(
                Object
                    .entries(formValues)
                    .filter(([_, value]) => value !== undefined)
            )
            console.info('Defined form values: ', definedValues)
            if (isAdding) {
                add({ ...defaultJson.tickets[0], ...definedValues })
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
            title={isAdding ? `Create Ticket #${order}` : `Edit Ticket: ${ticket.ticketId}`}
            closable={{ 'aria-label': 'Close' }}
            open={isModalOpen}
            onCancel={cancel}
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
                    layout="horizontal"
                    form={form}
                    name="ticket-editor"
                    initialValues={isAdding ? { ...defaultJson.tickets[0] } : { ...ticket }}
                    clearOnDestroy
                    onFinish={ok}
                >
                    {dom}
                </Form>
            )}
        >
            <Flex gap="middle" align="start" justify="space-between" wrap>
                {[leftColumnItems, rightColumnItems].map((columnItems, columnIndex) => (
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
                            >
                                {item.rules.length > 0
                                    ? (
                                        <Input
                                            type="text"
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
