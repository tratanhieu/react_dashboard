import React, { Component } from 'react'
import {
    Container, Form, Modal, Transition, Icon, Image, 
    Grid,
    Segment,
    Dimmer,
    Loader,
    Pagination,
    Header,
    Button,
    Dropdown, Divider
} from 'semantic-ui-react'
import TableHeader from '../../molecules/TableHeader';
import TableBody from '../../molecules/TableBody';
import TableRow from '../../molecules/TableRow';
import TableColumn from '../../molecules/TableColumn';
import TablePagination from '../../molecules/TablePagination';

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

export default class Main extends Component {
    state = {
        open: false
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
                        <Header>Danh sách</Header>
                        </Grid.Column>
                        <Grid.Column>
                        <Button icon primary floated="right" labelPosition="left">
                            <Icon name="plus" />
                            Thêm mới
                        </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row>
                        <Grid.Column verticalAlign="middle" width={16}>
                        <Dropdown
                            placeholder="State"
                            search
                            selection
                            options={stateOptions}
                            floated="left"
                        />
                        &nbsp;&nbsp;
                        <Button icon primary disabled>
                            <Icon loading name="spinner" />&nbsp;&nbsp;
                            Thực hiện
                        </Button>
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    <TableHeader>
                        <TableColumn>
                            #
                        </TableColumn>
                        <TableColumn>
                            Tên loại sản phẩm
                        </TableColumn>
                        <TableColumn>
                            Trạng thái
                        </TableColumn>
                        <TableColumn>
                            Hành động
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                        </TableRow>
                        <TableRow>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                        </TableRow>
                        <TableRow>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                        </TableRow>
                        <TableRow>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                        </TableRow>
                        <TableRow>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                            <TableColumn>
                                <span>Nguyen Văn Anh</span>
                            </TableColumn>
                        </TableRow>
                    </TableBody>
                    <TablePagination
                        totalPages={10000}
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