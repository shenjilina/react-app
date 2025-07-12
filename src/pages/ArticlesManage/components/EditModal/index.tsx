import React from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  Switch,
  Button,
  message,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { FormInstance, UploadProps } from 'antd'
import type { IArticleData } from '../../hooks/usePageForm.ts'

const { Option } = Select
const { TextArea } = Input

interface IEditModalProps {
  visible: boolean
  loading: boolean
  editingArticle: IArticleData | null
  form: FormInstance
  onOk: () => Promise<void>
  onCancel: () => void
}

const EditModal: React.FC<IEditModalProps> = ({
  visible,
  loading,
  editingArticle,
  form,
  onOk,
  onCancel,
}) => {
  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    },
  }

  return (
    <Modal
      title={editingArticle ? '编辑文章' : '新增文章'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 'draft',
          isTop: false,
        }}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[
            { required: true, message: '请输入文章标题' },
            { min: 5, max: 100, message: '标题长度为5-100个字符' },
          ]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item
          label="作者"
          name="author"
          rules={[
            { required: true, message: '请输入作者' },
            { max: 20, message: '作者名称不能超过20个字符' },
          ]}
        >
          <Input placeholder="请输入作者" />
        </Form.Item>

        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select placeholder="请选择分类">
            <Option value="前端技术">前端技术</Option>
            <Option value="后端技术">后端技术</Option>
            <Option value="运维技术">运维技术</Option>
            <Option value="产品设计">产品设计</Option>
            <Option value="行业资讯">行业资讯</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="文章摘要"
          name="summary"
          rules={[
            { required: true, message: '请输入文章摘要' },
            { max: 200, message: '摘要不能超过200个字符' },
          ]}
        >
          <TextArea
            placeholder="请输入文章摘要"
            rows={3}
            showCount
            maxLength={200}
          />
        </Form.Item>

        <Form.Item
          label="封面图片"
          name="coverImage"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="发布状态"
          name="status"
          rules={[{ required: true, message: '请选择发布状态' }]}
        >
          <Select placeholder="请选择发布状态">
            <Option value="draft">草稿</Option>
            <Option value="published">发布</Option>
            <Option value="archived">归档</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="发布时间"
          name="publishTime"
        >
          <DatePicker
            showTime
            placeholder="请选择发布时间"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="置顶"
          name="isTop"
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
