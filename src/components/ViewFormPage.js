import React, { Component } from 'react';
import FillableForm from './common/FillableForm';
import Breadcrumbs from './app/Breadcrumbs';

import FormModel from '../models/form.model';

class ViewFormPage extends Component {

  constructor(props, state) {
    super(props, state);

    this.formModel = new FormModel();

    this.state = {
      formId: this.props.match ? this.props.match.params.formId : null,
      breadcrumbs: []
    };
  }

  componentDidMount() {
    if (this.state.formId) {
      this.getForm();
    }
  }

  async getForm() {
    let form = await this.formModel.get(this.state.formId);
    this.setState({
      breadcrumbs: [{
        label: form.name,
        path: `/form/${form.id}/submissions`
      }]
    });
  }

  render() {
    if (this.state.formId === null) {
      return (
        <main>
          <Breadcrumbs paths={[]} current={'Form Details'}/>
          <p>No form found.</p>
        </main>
      );
    }

    return (
      <main>
        <Breadcrumbs paths={this.state.breadcrumbs} current={'Add submission'}/>
        <FillableForm formId={this.state.formId} />
      </main>
    );
  }
}

export default ViewFormPage;
