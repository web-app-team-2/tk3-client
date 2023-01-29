import React from 'react';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

import {
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { collection, query, orderBy } from 'firebase/firestore';

import firestore from '../../database/firestore';
import styles from './HomePage.module.css';
import HomePageConstants from './HomePageConstants';
import AttachmentComponent from '../../components/Attachment/Attachment';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';
import useUserStore from '../../database/store';

function HomePage() {
  const setToken = useUserStore(state => state.setToken)
  const navigate = useNavigate()
  const queryRef = query(collection(firestore, 'inventories'), orderBy('createdAt', 'desc'));
  const { data, isLoading, isError } = useFirestoreQuery(['inventories'], queryRef, {
    subscribe: true,
  });

  const snapshot = data;

  const logout = () => {
    setToken(null)
  }

  return (
    <div className={styles['home-page']}>
      <div className={styles.container}>
        <div className={styles['table-header']}>
          <h3 style={{ marginBottom: '0' }}><strong>Data</strong></h3>
          <div className={styles['button-header']}>
            <Link to="/create">
              <button type="button" className="btn btn-primary">Tambah</button>
            </Link>
            <button type="button" className="btn btn-warning" onClick={logout}>Logout</button>
          </div>
        </div>
        <hr className="solid" />
        {
          isLoading || isError
            ? <div className="tbodyDiv"><SpinnerComponent /></div>
            : (
              <div className="tbodyDiv">
                <table className="table align-middle table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      {
                        HomePageConstants.tableHeaders.map((header) => <th scope="col">{header}</th>)
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      snapshot.docs.map((docSnapshot, i) => {
                        const user = docSnapshot.data();

                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.description}</td>
                            <td>{user.sellPrice}</td>
                            <td>{user.buyPrice}</td>
                            <td>
                              <AttachmentComponent url={user.photo} />
                            </td>
                            <td>
                              <button type="button" className="btn btn-primary" onClick={() => navigate(`/edit/${docSnapshot.id}`)}>Edit</button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default HomePage;
