import React, { Component } from 'react'
import {
    Container, Form, Modal, Transition, Icon, Image, 
    Grid,
    Segment,
    Dimmer,
    Checkbox,
    Label,
    Header,
    Button,
    Dropdown, Divider
} from 'semantic-ui-react'
import ProductTypeTable from '../../organisms/tables/ProductTypeTable';

const stateOptions = [
    {
        key: "1",
        text: "Việt Nam",
        value: "VietNam"
    },
    {
        key: "2",
        text: "Sinapore",
        value: "Sin"
    }
];

const header = [
    {
        width: 5,
        name: "Tên loại sản phẩm"
    },
    {
        width: 3,
        name: "Trạng thái"
    }
]

const productTypes = [
    {
        name: 'Nước lọc',
        status: 'ACTIVE'
    },
    {
        name: 'Nước ngọt',
        status: 'IN_ACTIVE'
    },
    {
        name: 'Nước lọc',
        status: 'ACTIVE'
    }
]

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
    }
    state = {
        open: false,
        checkAll: false
    }

    handleCheckAll() {
        this.setState({ checkAll: !this.state.checkAll });

        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:${
            this.state.checkAll ? `checked` : `not(:checked)`}`
        );
        checkboxItems.forEach(item => item.click());
    }

    handleItemCheck(e, checkbox) {
        this.child.current.handleItemCheck(e, checkbox)
    }

    handleExecute() {
        const checkboxItems = this._getAllCheckedItem();
        console.log("Total " + checkboxItems.length);
    }

    _checkCheckAll() {
        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']`
        ).length;

        const checkboxItemsChecked = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
        ).length + 1;

        return checkboxItems === checkboxItemsChecked;
    }

    _getAllCheckedItem() {
        let data = [];
        const checkboxItems = document.querySelectorAll(
            `div[data-checkbox='checkboxItem'] input[type='checkbox']:checked`
        );

        if (checkboxItems) {
            checkboxItems.forEach(item => data.push(item.value));
        }
        return data;
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Input label="Username: " required />
                </Form>
                <Segment>
                    <Grid columns="equal" padded="vertically">
                        <Grid.Row>
                            <Grid.Column verticalAlign="middle">
                                <h1>Danh sách</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Button icon primary floated="right" labelPosition="left">
                                    <Icon name="plus" />
                                    Thêm mới
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                    </Grid>
                    <ProductTypeTable header={header}
                        body={productTypes}
                        totalPages={20}
                        defaultActivePage={5}
                    />
                </Segment>

                <Transition visible={this.state.open} animation='slide down' duration={500}>
                    <Modal open={this.state.open} centered={false} onClose={() => this.setState({open: false})} closeIcon>
                        <Modal.Header>Thêm loại sản phẩm</Modal.Header>
                        <Modal.Content>
                            <p>Are you sure you want to delete your account</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative>No</Button>
                            <Button positive icon='checkmark' labelPosition='right' content='Yes' />
                            <Button negative onClick={() => this.setState({open: false})} ><Icon name="close"/> Đóng</Button>
                        </Modal.Actions>
                    </Modal>
                </Transition>
            </Container>
        )
    }
}