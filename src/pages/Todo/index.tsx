import Reactm, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {Button, Alert, Modal, Form, Input, Select, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import {add, edit, getTodoLists} from '@/services/todo'
import {connect} from 'umi'
import ProForm, {ProFormText} from "@ant-design/pro-form";

const Todo = (props) => {
  let [isModalVisible, setIsModalVisible] = useState(false)

  // 方法一: 直接发起请求获取数据
  // let [data, setData] = useState([])
  //
  // useEffect(async () => {
  //   const resData = await getTodoLists()
  //   setData(resData)
  // }, [])

  // 方法二: 使用model 获取数据
  const {todoList: data} = props.todo

  // 打开添加表单的事件
  const showForm = () => {
    setIsModalVisible(true)
  }

  // 点击模态框关闭的事件
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // 获取最新todoList
  const getData = () => {
    props.dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
  }

  // 提交表单, 并且表单验证通过后执行的方法
  const handleForm = async (value) => {
    // 执行添加todo
    const res = await add(value)

    if (res.code === 0) {
      getData()
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  }

  // 修改todo状态
  const changeStatus = async (id, status) => {
    // 调用services中的方法, 修改状态
    const res = await edit({id, status})

    // 判断执行结果
    if (res.code === 0) {
      getData()
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  }

  const status = [
    <Alert message="待办" type="info" showIcon />,
    <Alert message="已完成" type="success" showIcon />,
    <Alert message="已取消" type="error" showIcon />,
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, record) => status[record.status]
    },
    {
      title: '修改状态',
      render: (_, record) => {
        let editOperation = []
        if (record.status !== 0) {
          editOperation.push(<a onClick={() => changeStatus(record.id, 0)} key={0}>待办 </a>)
        }
        if (record.status !== 1) {
          editOperation.push(<a onClick={() => changeStatus(record.id, 1)} key={1}>完成 </a>)
        }
        if (record.status !== 2) {
          editOperation.push(<a onClick={() => changeStatus(record.id, 2)} key={2}>取消 </a>)
        }
        return editOperation
      }
    },
  ]

  // status: 0 代办  1 完成  2取消
  // const data = [
  //   {id: 1, title: 'TodoList列表', status: 1},
  //   {id: 2, title: 'TodoList添加', status: 1},
  //   {id: 3, title: 'TodoList编辑', status: 2},
  //   {id: 4, title: 'TodoList修改状态', status: 0},
  // ]

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        search={false}
        dateFormatter="string"
        headerTitle="待办事项列表"
        dataSource={data}
        // request={async () => ({data: await getTodoLists()})}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showForm}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />

      <Modal title="添加代办事项" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <ProForm onFinish={value => handleForm(value) }>
          <ProFormText name="todo" label="待办事项" rules={[{ required: true }]} />
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default connect(( {todo} ) => ({todo}))(Todo);
