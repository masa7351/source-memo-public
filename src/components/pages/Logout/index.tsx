import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../logics/actions/authActions';

/**
 * Logout dummy page
 * Cloud FirestoreのonSnapshotをunsubscribeするためのダミーの画面
 * subscribeしたままログアウトするとセキュリティーエラーがコンソールに出力される問題がある。
 */
const Logout: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return <div></div>;
};

export default Logout;
