import { Form, Button, Card } from '@ahaui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import TextLink from '../../../layouts/TextLink';
import authService from '../../../services/auth.service';
import { setLocalStorage } from '../../../services/utils/browser-storage';

function Login() {
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const { actions } = useAuth();
  const role = ['Admin', 'Operator'];
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ''
    },
    onSubmit: async values => {
      try {
        const res = await authService.login({ ...values, role: selectedValue });
        const { data: { token } } = res;

        setLocalStorage('access_token', token);
        actions.fetchUserInfo();
      } catch (err) {
        setError(err);
      }
    }
  });

  return (
    <div className="login">
      <Card className="u-roundedLarge">
        <Card.Body>
          <Form className="form" onSubmit={form.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="user-email">Email</Form.Label>
              <Form.Input
                id="user-email"
                type="text"
                name="email"
                placeholder="Enter email"
                isInvalid={!!error}
                onChange={form.handleChange}
              />
              <Form.Label htmlFor="user-password">Password</Form.Label>
              <Form.Input
                id="user-password"
                type="password"
                name="password"
                placeholder="Enter password"
                isInvalid={!!error}
                onChange={form.handleChange}
              />
              <Form.Label htmlFor="user-role">Role</Form.Label>
              {(role).map((value, index) => {
                return (
                  <Form.Check
                    key={index}
                    name="role"
                    checked={value === selectedValue}
                    onChange={(() => setSelectedValue(value))}
                    type="radio"
                    label={`${value}`}
                    id={`radio-button-${value}`}
                  />
                );
              })}
              <Form.Feedback role="alert" type="invalid">{error}</Form.Feedback>
            </Form.Group>
            <div className="text-below-form">
              Not a member?&nbsp;
              <TextLink paths={['..', 'signup']} text="Sign up" />
            </div>
            <div className="btn-submit">
              <Button type="submit">Log in</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
