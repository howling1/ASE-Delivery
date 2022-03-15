import React, {useEffect} from "react";
import DrawerContainer from "../../components/DrawerContainer";
import UserDetail from "../../components/management-users/UserDetail";
import {useDispatch, useSelector} from "react-redux";
import {selectUserDetail, loadUserByIdAsync, deleteUserAsync} from "../../features/user/usersSlice";
import {useParams} from "react-router-dom";
import BackButton from "../../components/BackButton";


const UserDetailPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(selectUserDetail)

    useEffect(() => {
        dispatch(loadUserByIdAsync(id))
    }, [dispatch, id])

    const onDeleteUser = () => {
        if (id) {
            dispatch(deleteUserAsync(id))
        }
    }

    return (
        <DrawerContainer>
            <BackButton link='/management/users' />
            <h1>User Detail</h1>
            {user && user.id === id &&
            <UserDetail
                role={user && user.role}
                id={user && user.id}
                email={user && user.email}
                password={user && user.password}
                rfid={user && user.rfid}
                status={user && user.status}
                onDeleteUser={onDeleteUser}
            />
            }
        </DrawerContainer>
    )
};

export default UserDetailPage;
