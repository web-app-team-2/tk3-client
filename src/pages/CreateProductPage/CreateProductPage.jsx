import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './CreateProductPage.module.css';
import FormWarningTextComponent from '../../components/FormWarningText/FormWarningTextComponent';
import { useSubmitForm } from './CreateProductPage.hooks';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import arrowIcon from '../../../public/arrow-back.svg';

function CreateProductPage() {
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm();
  const { loading, success, submitForm } = useSubmitForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) navigate('/');
  }, [success]);

  return (
    <div className={styles['page-container']}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles['navigation-and-title-container']}>
            <div onClick={() => navigate(-1)}>
              <img src={arrowIcon} alt="back" className={styles['back-btn']} />
            </div>
            <h3 style={{ marginBottom: '0' }}><strong>Tambah Data</strong></h3>
          </div>
        </div>
        <hr className="solid" style={{ margin: '0' }} />
        {loading ? <LoadingComponent /> : (
          <div className={styles.form}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Nama Produk</label>
                <input className="form-control" id="validationCustomUsername" aria-describedby="emailHelp" {...register('name', { required: true })} aria-invalid />
                {errors.name && <FormWarningTextComponent text="Nama wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Deskripsi</label>
                <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('description', { required: true })} />
                {errors.address && <FormWarningTextComponent text="Deskripsi wajib diisi" />}
              </div>

              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Harga Jual</label>
                <input type="number" className="form-control" id="validationCustomUsername" aria-describedby="emailHelp" {...register('sellPrice', { required: true })} aria-invalid />
                {errors.sellPrice && <FormWarningTextComponent text="Harga Jual wajib diisi" />}
              </div>

              <div className="mb-3 has-validation">
                <label htmlFor="exampleInputEmail1" className="form-label">Harga Beli</label>
                <input type="number" className="form-control" id="validationCustomUsername" aria-describedby="emailHelp" {...register('buyPrice', { required: true })} aria-invalid />
                {errors.buyPrice && <FormWarningTextComponent text="Harga Beli wajib diisi" />}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Foto</label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" accept="image/png, image/jpeg, image/doc, image/jpeg, application/pdf" {...register('photo', { required: true })} />
                </div>
                {errors.photo && <FormWarningTextComponent text="Foto wajib diisi" />}
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateProductPage;
