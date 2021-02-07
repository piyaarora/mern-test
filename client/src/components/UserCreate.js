import React from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    EmailField
} from 'react-admin'

const UserCreate = (props) => {
    return (
        <Create title='Create a User' {...props}>
            <SimpleForm>
                <TextInput  source='name' />
                <EmailField source='email' />
                <DateInput label = 'Published' source ='publishedAt' />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate