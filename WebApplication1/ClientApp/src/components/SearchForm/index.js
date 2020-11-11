import React, { useImperativeHandle, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Selectoption, Multiselect } from '@/utils/index';
import { Legal, Risk, News } from '@/utils/configText';
import { Exchange } from '@/utils/index';

import './index.less';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const FormItem = Form.Item;
const ManagementForm = React.forwardRef((props, ref) => {
    console.log('props', props)
    const [form] = Form.useForm();
    useImperativeHandle(ref, () => ({
        form: form
    }));
    return (
        <Form
            form={form}
            name="control-hooks"
            {...layout}
            className={props.show === true ? "creatform block" : "creatform hidden"}
            onValuesChange={props.onValuesChange}
        >
            <div className="form-btn-box">
                <h1>Advanced Search</h1>
            </div>
            <FormItem name="otherwords" label={<div>All this word:</div>}>
                <Input className="disabled-color" placeholder="Text you are looking for" />
            </FormItem>
            <FormItem name="keyqw" label={<div>Negative Words:</div>} initialValue=''>
                <Input.Group compact>
                    <FormItem
                        name="Legal"
                        noStyle
                    >
                        {Multiselect(Legal, "Select Legal Words")}
                    </FormItem>
                    <FormItem
                        name="Risk"
                        noStyle
                        style={{ margin: '0 1.5%' }}
                    >
                        {Multiselect(Risk, "Select Risk Words")}
                    </FormItem>
                    <FormItem
                        name="Words"
                        noStyle
                    >
                        {Multiselect(News, "Select News Words")}
                    </FormItem>
                    <FormItem name="otherkeywords" label={false}>
                        <Input className="disabled-color special-input" placeholder="if others, please specify (use a space to separate words)" />
                    </FormItem>
                </Input.Group>
            </FormItem>
            <FormItem name="OmitWords" label={<div>Omit this words:</div>}>
                <Input className="disabled-color" placeholder="Omit this words (use a space to separate words)" />
            </FormItem>
            <FormItem
                label={<div>Number of results<p>displayed on page:</p></div>}
                name="rn"
                initialValue={props.resultPage[0].cord}
            >
                {Selectoption(props.resultPage)}
            </FormItem>
            <FormItem
                label={<div>Time to limit pages:</div>}
                name="lm"
                initialValue={props.resultTime[0].cord}
            >
                {Selectoption(props.resultTime)}
            </FormItem>
            <FormItem
                name="wd"
                label={<div>Search string:</div>}
            >
                <Input className="disabled-color" disabled={false} readOnly />
            </FormItem>
            {
                props.error === true ? (
                    <p className='error'>maximum field length cannot exceed 38 characters.</p>
                ) : null
            }
            <Button className="reset" onClick={props.onReset} type="text">reset</Button>
        </Form>
    );
});
export default ManagementForm;