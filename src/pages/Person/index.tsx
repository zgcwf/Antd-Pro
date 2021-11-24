/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import React, {useRef, useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import {getPerson} from "@/services/person";
import {connect} from 'umi'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    hideInSearch: true
  }
]

const Person = (props) => {
  const actionRef = useRef();

  // console.log('props',props);

  const {dispatch} = props

  useEffect(() => {
    // model中只定义了获取数据的方法，但没有调用，在此调用model, 更新数据
    dispatch({
      type: 'person/fetchPersons',
      payload: null
    })
  }, [])

  // const personList = async () => {
  //   // 发起请求获取数据,不使用dva，直接获取
  //   const data = await getPerson();
  //   // console.log(data);
    
  //   return {data:data}
  // }

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        dataSource={props.person.persons}
        // 不用dva时用request发起请求获取数据
        // request={async (params = {}) => personList() }
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
      />
    </PageContainer>
  );
};

export default connect(({person}) => ({person}))(Person);
