import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    EmailField
} from 'react-admin'

const UserEdit = (props) => {
    return (
        <Edit title='Edit User' {...props}>
            <SimpleForm>
                <TextInput disabled source='id' />
                <TextInput source='name' />
                <EmailField source='email' />
                <DateInput label = 'Published' source ='publishedAt' />
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit