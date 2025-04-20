import { useConfigureAccounts as useContextConfigureAccounts } from '../contexts/ConfigureAccountsContext.tsx';

export const useConfigureAccounts = useContextConfigureAccounts;

export const useUserSelection = () => {
    const {users, selectedUser, handleUserChange} = useConfigureAccounts();
    return {users, selectedUser, handleUserChange};
}

export const useUserForm = () => {
    const {form, handleInputChange, handleSave, message} = useConfigureAccounts();
    return { form, handleInputChange, handleSave, message};
}