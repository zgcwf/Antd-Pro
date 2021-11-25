/* eslint-disable @typescript-eslint/no-shadow */
import React,{useEffect,useState,useRef} from 'react';
import {add,getTodoLists,edit} from '../../services/todo'
import { PageContainer } from '@ant-design/pro-layout';
import { Button,Modal,Form,Input,message} from 'antd';
import ProTable from '@ant-design/pro-table';
import { Tag } from 'antd';
import {  connect } from 'umi';
// import ProForm, { ProFormText } from '@ant-design/pro-form';

 const Todo = (props) => {
  const tags =[
    <Tag color="processing">待办</Tag>,
    <Tag color="success">完成</Tag>,
    <Tag color="error">取消</Tag>
  ]
  const columns= [
    {
      title: 'id',
      width: 200,
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text,record)=>{
      // console.log(text,record);text:status值，record：当前项
      return tags[record.status]
      }
    },
    {
      title: '修改状态',
      width: 180,
      key: 'option',
      valueType: 'option',
      render: (_,record) =>{
      const tab =[]
      if(record.status!==0){
        tab.push(<a key={0} onClick={() => changeStatus(record.id, 0)}>代办</a>) 
      }
      if(record.status!==1){
        tab.push(<a key={1} onClick={() => changeStatus(record.id, 1)}>完成</a>) 
      }
      if(record.status!==2){
        tab.push(<a key={2} onClick={() => changeStatus(record.id, 2)}>取消</a>) 
      }
        return tab
      } 
    },
  ];
   // 模拟数据，status: 0 代办  1 完成  2取消
    // const data = [
    //   {id: 1, title: 'TodoList列表', status: 1},
    //   {id: 2, title: 'TodoList添加', status: 1},
    //   {id: 3, title: 'TodoList编辑', status: 2},
    //   {id: 4, title: 'TodoList修改状态', status: 0},
    // ]
   const[visible,setVisible] = useState(false)
   const [form] = Form.useForm();
  
  // 方法一: 直接发起请求获取数据,data放在dataSource中
  // let [data, setData] = useState([])  
  // useEffect(async () => {
  //   const resData = await getTodoLists()
  //   setData(resData)
  // }, [])

  // 方法三：使用model获取数据，可以直接从props中获取，不用调用dispatch方法了，
  // 因为在src\components\GlobalHeader\AvatarDropdown.tsx文件中已经调用过此方法发起请求得到数据
  // console.log(props);
  const {todoList:data} = props.todo
 

// 显示表单
   const onVisible = ()=>{
    setVisible(true)
   }

// 关闭表单
  const onCancel = ()=>{
    setVisible(false)
     // 表单重置
    form.resetFields()
   }
 
  // 获取最新todoList
  const getData = () => {
    props.dispatch({
      type: 'todo/getTodoList',
      payload: null
    })
  }
// 提交表单, 并且表单验证通过后执行的方法
   const addFormOK = () => {
    // validateFields() 触发表单验证,得到了表单提交的数据value
    form.validateFields().then(async value => {
      // console.log( value)
      // 执行添加todo
     const res = await add(value)
    //  console.log(res);
    if (res.code === 0) {
      getData()
      message.success(res.message)
    } else {
      message.error(res.message)
    }
      setVisible(false)
   // 表单重置
    form.resetFields()
    }
  )
}
// 提交表单, 并且表单验证通过后执行的方法
// const handleForm = async (value) => {
//   // 执行添加todo
//   const res = await add(value)

//   if (res.code === 0) {
//     getData()
//     message.success(res.message)
//   } else {
//     message.error(res.message)
//   }
// }

// 修改todo状态
 const changeStatus = async (id: any, status: number) => {
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
  return (
    <PageContainer>
         <ProTable
      columns={columns}
     dataSource={data}
    // 方法二: 用request发起请求获取数据，返回一个对象，内部有data
    //  request={async()=>({ data: await getTodoLists() })}
      rowKey="id"
      // 分页器
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      headerTitle="待办事项列表"
      // 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={onVisible}>
          新建
        </Button>,
      ]}
    />
  
    {/* <Modal title="添加代办事项" visible={visible} onCancel={onCancel} footer={null}>
        <ProForm onFinish={value => handleForm(value) }>
          <ProFormText name="todo" label="待办事项" rules={[{ required: true }]} />
        </ProForm>
      </Modal> */}
            <Modal 
      visible={visible}
      title="添加待办事项"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => addFormOK()}
    >
      <Form layout="vertical" name="form_in_modal" form={form}>
        <Form.Item  label="待办事项" name="todo"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        > 
          <Input /> 
         </Form.Item>
      </Form>
    </Modal>
      </PageContainer>
  )
}
export default connect(({todo }: any)=>({todo}))(Todo)