import { Form, Button, Card } from '@ahaui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import TextLink from '../../../layouts/TextLink';
import authService from '../../../services/auth.service';
import { setLocalStorage } from '../../../services/utils/browser-storage';

function SignUp() {
  const [error, setError] = useState('');
  const { actions } = useAuth();

  const form = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      setError('');
      try {
        const data = await authService.signup(values);
        // const { access_token: accessToken } = data;

        // setLocalStorage('access_token', accessToken);
        // actions.fetchUserInfo();
      } catch (err) {
        setError(err);
      }
    }
  });

  return (
    <div className="signup">
      <Card className="u-roundedLarge">
        <Card.Body>
          <Form className="form" onSubmit={form.handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Input
                type="text"
                name="email"
                placeholder="Enter email"
                isInvalid={!!error}
                onChange={form.handleChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Input
                type="password"
                name="password"
                placeholder="Enter password"
                isInvalid={!!error}
                onChange={form.handleChange}
              />
              <Form.Feedback type="invalid">{error}</Form.Feedback>
            </Form.Group>
            <div className="text-below-form">
              Already have an account?&nbsp;
            <TextLink paths={['..', 'login']} text="Log in"/></div>
            <div className="btn-submit">
              <Button type="submit">Sign up</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
