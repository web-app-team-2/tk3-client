import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditProductPage.module.css';
import FormWarningTextComponent from '../../components/FormWarningText/FormWarningTextComponent';
import { useEditProduct } from './EditProductPage.hooks';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import arrowIcon from '../../../public/arrow-back.svg';
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import {
  query,
  collection,
  limit,
  QuerySnapshot,
  doc
} from "firebase/firestore";
import firestore from '../../database/firestore';
import { useState } from 'react';

function EditProductPage() {
  const {
    register, handleSubmit, formState: { errors }, setValue
  } = useForm();
  const { id } = useParams();
  const { loading, success, submitForm } = useEditProduct(id);
  const navigate = useNavigate();

  const ref = doc(firestore, "inventories", id);
  const product = useFirestoreDocument(["inventories", id], ref);

  const snapshot = product.data;
  const productData = snapshot?.data();

  useEffect(() => {
    if (success) navigate('/');
  }, [success]);

  useEffect(() => {
    setValue('name', productData?.name)
    setValue('description', productData?.description)
    setValue('sellPrice', productData?.sellPrice)
    setValue('buyPrice', productData?.buyPrice)
  }, [productData])

  return (
    <div className={styles['page-container']}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['navigation-and-title-container']}>
            <div onClick={() => navigate(-1)}>
              <img src={arrowIcon} alt="back" className={styles['back-btn']} />
            </div>
            <h3 style={{ marginBottom: '0' }}><strong>Edit Produk</strong></h3>
          </div>
        </div>
        <hr className="solid" style={{ margin: '0' }} />
        {!productData ? <LoadingComponent /> : loading ? <LoadingComponent /> : (
          <div className={styles.form}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Nama Produk</label>
                <input className="form-control" id="name" aria-describedby="emailHelp" {...register('name', { required: true })} aria-invalid />
                {errors.name && <FormWarningTextComponent text="Nama wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Deskripsi</label>
                <input className="form-control" id="description" aria-describedby="emailHelp" {...register('description', { required: true })} aria-invalid />
                {errors.address && <FormWarningTextComponent text="Deskripsi wajib diisi" />}
              </div>

              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Harga Jual</label>
                <input className="form-control" id="sellPrice" aria-describedby="emailHelp" {...register('sellPrice', { required: true })} aria-invalid />
                {errors.sellPrice && <FormWarningTextComponent text="Harga Jual wajib diisi" />}
              </div>

              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Harga Beli</label>
                <input className="form-control" id="buyPrice" aria-describedby="emailHelp" {...register('buyPrice', { required: true })} aria-invalid />
                {errors.buyPrice && <FormWarningTextComponent text="Harga Beli wajib diisi" />}
              </div>

              <img src={productData?.photo} class="img-thumbnail"></img>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Foto</label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept="image/png, image/jpeg, image/doc, image/jpeg, application/pdf" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Edit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProductPage;
