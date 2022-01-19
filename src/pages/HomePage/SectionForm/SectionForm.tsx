import styles from './styles.module.scss';
import { ArrowRightTop, CheckSuccessIcon } from '../../../icons';
import { Button, Form, Input, Modal } from 'antd';
import React, { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { CONTACT_SECTION_ID } from '../constants';

const validateMessages = {
  required: '${label} is required!',
  types: { email: '${label} is not a valid email!' },
};

export const SectionForm: FC<{ navRef: { current: HTMLParagraphElement } }> = ({
  navRef,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const sendForm = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const onFinish = (values) => values;

  return (
    <section id={'contactForm'} className={styles.form}>
      <p
        className="itemForIntersectionMenu"
        id={CONTACT_SECTION_ID}
        ref={navRef}
      >
        Contact us
      </p>
      <div className={`container ${styles.formContainer}`}>
        <h2 className={styles.formTitle}>
          Can&apos;t find what you&apos;re looking for?
        </h2>
        <div className={styles.formWrapper}>
          <p className={styles.formText}>
            Write to us by mail
            <a href="mailto:hello@frakt.art">
              hello@frakt.art
              <ArrowRightTop className={styles.formArrowIcon} />
            </a>
            or leave message in the form below
          </p>
          <Form
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item name={['user', 'message']} rules={[{ required: true }]}>
              <Input placeholder="Your message" />
            </Form.Item>

            <div className={styles.formItemsWrapper}>
              <Form.Item
                name={['user', 'email']}
                rules={[{ type: 'email', required: true }]}
              >
                <Input placeholder="Your Email address" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={sendForm}>
                  Send
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        className={styles.formModal}
        getContainer={'#contactForm'}
        visible={isModalVisible}
        footer={false}
        centered={true}
        onCancel={closeModal}
      >
        <CheckSuccessIcon />
        <p className={styles.modalTitle}>Thank you!</p>
        <span className={styles.modalText}>
          We&apos;ve got your message! We will contact you shortly
        </span>
      </Modal>
    </section>
  );
};
