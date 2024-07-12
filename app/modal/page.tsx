import Layout from '@/components/sidebar/layout';
import React from 'react';
import { ConfirmDelete } from '@/components/modal/ConfirmDelete';
import { Metadata } from 'next';
import Modal from '@/components/modal/Modal';
export const metadata: Metadata = {
  title: 'Modal',
  description: 'Modal Page',
};

export default function ModalPage() {
  return (
    <div></div>
    // <Layout>
    //   {/* <Modal /> */}
    //   {/* <ConfirmDelete/> */}
    // </Layout>
  );
}
