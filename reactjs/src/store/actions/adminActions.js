import { getAllcodeService, createNewUserService, getAllUsers, deleteUserService, editUserService, getTopDoctorHomeService } from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

//Gender
export const fetchGenderStart = () =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcodeService("GENDER");
            if (res && res.errCode === 0)
            {
                dispatch(fetchGenderSuccess(res.data));
            } else
            {
                dispatch(fetchGenderFailed());
            }
        } catch (e)
        {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


//Position
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchPositionStart = () =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await getAllcodeService("POSITION");
            if (res && res.errCode === 0)
            {
                dispatch(fetchPositionSuccess(res.data));
            } else
            {
                dispatch(fetchPositionFailed());
            }
        } catch (e)
        {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }
}

//Role
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const fetchRoleStart = () =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await getAllcodeService("ROLE");
            if (res && res.errCode === 0)
            {
                dispatch(fetchRoleSuccess(res.data));
            } else
            {
                dispatch(fetchRoleFailed());
            }
        } catch (e)
        {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', e)
        }
    }
}

//Create User

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCES
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const createNewUser = (data) =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await createNewUserService(data);
            console.log('hoidanit check create user redux: ', res)
            if (res && res.errCode === 0)
            {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else
            {
                dispatch(saveUserFailed());
            }
        } catch (e)
        {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCES,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const fetchAllUserStart = () =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0)
            {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else
            {
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e)
        {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}


//delete user

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCES
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const deleteAUser = (userId) =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0)
            {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else
            {
                toast.error("Delete the user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e)
        {
            toast.error("Delete the user error!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

// edit user

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCES
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const editAUser = (data) =>
{
    return async (dispatch, getState) =>
    {
        try
        {
            let res = await editUserService(data);
            if (res && res.errCode === 0)
            {
                toast.success("Edit the user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else
            {
                toast.error("Edit the user error!");
                dispatch(editUserFailed());
            }
        } catch (e)
        {
            toast.error("Edit the user error!");
            dispatch(editUserFailed());
            console.log('EditUserFailed error', e)
        }
    }
}