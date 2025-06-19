import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function FormsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          href="/fundamentals" 
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Fundamentals
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Forms and Events
        </h1>
        <p className="text-xl text-muted-foreground">
          Master form handling, user input, validation, and event management in React applications.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Controlled vs Uncontrolled Components</h2>
          <p className="text-muted-foreground mb-6">
            In React, form inputs can be either controlled (managed by React state) or uncontrolled (managed by the DOM). 
            Controlled components are the recommended approach as they provide better control and integration with React&apos;s data flow.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Differences</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li><strong>Controlled:</strong> Form data is handled by React state</li>
              <li><strong>Uncontrolled:</strong> Form data is handled by the DOM itself</li>
              <li>Controlled components provide immediate validation and formatting</li>
              <li>Uncontrolled components are simpler but less flexible</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Controlled Components</h2>
          <p className="text-muted-foreground mb-6">
            Controlled components have their value managed by React state:
          </p>
          
          <CodeExample
            title="Controlled Form Components"
            code={`import { useState } from 'react';

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    interests: [],
    newsletter: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        // Handle multiple checkboxes
        setFormData(prev => ({
          ...prev,
          interests: checked
            ? [...prev.interests, value]
            : prev.interests.filter(interest => interest !== value)
        }));
      } else {
        // Handle single checkbox
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Text Input */}
      <div>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Number Input */}
      <div>
        <label htmlFor="age">Age *</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          max="120"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      {/* Select Dropdown */}
      <div>
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country ? 'error' : ''}
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
        </select>
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>

      {/* Multiple Checkboxes */}
      <div>
        <label>Interests</label>
        <div className="checkbox-group">
          {['Technology', 'Sports', 'Music', 'Travel', 'Cooking'].map(interest => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                name="interests"
                value={interest}
                checked={formData.interests.includes(interest)}
                onChange={handleChange}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      {/* Single Checkbox */}
      <div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      <button type="submit">Submit</button>

      {/* Display form data for debugging */}
      <div className="debug-info">
        <h3>Form Data:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  );
}`}
            explanation="Controlled components give you full control over form state, enabling real-time validation and dynamic behavior."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Uncontrolled Components</h2>
          <p className="text-muted-foreground mb-6">
            Uncontrolled components use refs to access form values directly from the DOM:
          </p>
          
          <CodeExample
            title="Uncontrolled Form Components"
            code={`import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get values directly from DOM
    const formData = new FormData(formRef.current);
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      file: fileRef.current.files[0],
      country: formData.get('country'),
      newsletter: formData.get('newsletter') === 'on'
    };

    console.log('Uncontrolled form data:', data);
  };

  const handleReset = () => {
    // Clear form using refs
    nameRef.current.value = '';
    emailRef.current.value = '';
    fileRef.current.value = '';
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          ref={nameRef}
          type="text"
          id="name"
          name="name"
          defaultValue="John Doe" // Use defaultValue, not value
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
        />
      </div>

      <div>
        <label htmlFor="country">Country</label>
        <select id="country" name="country" defaultValue="us">
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      <div>
        <label htmlFor="file">Upload File</label>
        <input
          ref={fileRef}
          type="file"
          id="file"
          name="file"
          accept=".jpg,.png,.pdf"
        />
      </div>

      <div>
        <label>
          <input type="checkbox" name="newsletter" />
          Subscribe to newsletter
        </label>
      </div>

      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

// Custom hook for uncontrolled forms
function useFormData(formRef) {
  const getFormData = () => {
    if (!formRef.current) return {};
    
    const formData = new FormData(formRef.current);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      if (data[key]) {
        // Handle multiple values (like checkboxes with same name)
        data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
      } else {
        data[key] = value;
      }
    }
    
    return data;
  };

  return { getFormData };
}

// Usage with custom hook
function FormWithHook() {
  const formRef = useRef(null);
  const { getFormData } = useFormData(formRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getFormData();
    console.log('Form data:', data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}`}
            explanation="Uncontrolled components are simpler for basic forms but provide less control over the input behavior."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Form Validation Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Implement robust validation with real-time feedback:
          </p>
          
          <CodeExample
            title="Advanced Form Validation"
            code={`import { useState, useCallback, useMemo } from 'react';

// Validation rules
const validationRules = {
  required: (value) => value.trim() !== '' || 'This field is required',
  email: (value) => /\\S+@\\S+\\.\\S+/.test(value) || 'Invalid email address',
  minLength: (min) => (value) => 
    value.length >= min || \`Must be at least \${min} characters\`,
  maxLength: (max) => (value) => 
    value.length <= max || \`Must be no more than \${max} characters\`,
  pattern: (regex, message) => (value) => 
    regex.test(value) || message,
  custom: (validator) => validator
};

// Custom validation hook
function useFormValidation(initialState, validationSchema) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const fieldRules = validationSchema[name];
    if (!fieldRules) return '';

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error !== true && error) {
        return error;
      }
    }
    return '';
  }, [validationSchema]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationSchema]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: newValue }));

    // Validate on change if field was already touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const isValid = useMemo(() => {
    return Object.keys(validationSchema).every(name => 
      !validateField(name, values[name])
    );
  }, [values, validationSchema, validateField]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
    setErrors
  };
}

// Registration form with validation
function RegistrationForm() {
  const validationSchema = {
    username: [
      validationRules.required,
      validationRules.minLength(3),
      validationRules.maxLength(20),
      validationRules.pattern(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      )
    ],
    email: [
      validationRules.required,
      validationRules.email
    ],
    password: [
      validationRules.required,
      validationRules.minLength(8),
      validationRules.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      )
    ],
    confirmPassword: [
      validationRules.required,
      validationRules.custom((value, values) => 
        value === values.password || 'Passwords do not match'
      )
    ]
  };

  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm
  } = useFormValidation({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }, validationSchema);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.username && errors.username ? 'error' : ''}
        />
        {touched.username && errors.username && (
          <span className="error-message">{errors.username}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.email && errors.email ? 'error' : ''}
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.password && errors.password ? 'error' : ''}
        />
        {touched.password && errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.confirmPassword && errors.confirmPassword ? 'error' : ''}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={!isValid || isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>

      <div className="form-status">
        <p>Form is {isValid ? 'valid' : 'invalid'}</p>
      </div>
    </form>
  );
}`}
            explanation="This validation system provides real-time feedback, custom validation rules, and proper user experience patterns."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">File Upload Handling</h2>
          <p className="text-muted-foreground mb-6">
            Handle file uploads with preview, validation, and progress tracking:
          </p>
          
          <CodeExample
            title="File Upload Component"
            code={`import { useState, useRef, useCallback } from 'react';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // File validation
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Only JPEG, PNG, GIF, and PDF files are allowed';
    }

    return null;
  };

  // Handle file selection
  const handleFiles = useCallback((selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(\`\${file.name}: \${error}\`);
      } else {
        validFiles.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          status: 'pending'
        });
      }
    });

    if (errors.length > 0) {
      alert('Some files were rejected:\\n' + errors.join('\\n'));
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  // Handle file input change
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Upload file with progress
  const uploadFile = async (fileItem) => {
    const formData = new FormData();
    formData.append('file', fileItem.file);

    try {
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { ...f, status: 'uploading' } : f
      ));

      // Simulate upload with progress
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      // Simulate progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(prev => ({
          ...prev,
          [fileItem.id]: progress
        }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (response.ok) {
        const result = await response.json();
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'uploaded', url: result.url }
            : f
        ));
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id 
          ? { ...f, status: 'error', error: error.message }
          : f
      ));
    } finally {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileItem.id];
        return newProgress;
      });
    }
  };

  // Remove file
  const removeFile = (fileId) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      // Clean up preview URLs
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-container">
      {/* Drop Zone */}
      <div
        className={\`drop-zone \${dragActive ? 'active' : ''}\`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleInputChange}
          accept="image/*,.pdf"
          style={{ display: 'none' }}
        />
        
        <div className="drop-zone-content">
          <svg className="upload-icon" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
          <p>Drag and drop files here, or click to select files</p>
          <p className="file-types">Supported: JPEG, PNG, GIF, PDF (max 5MB)</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="file-list">
          <h3>Selected Files ({files.length})</h3>
          
          {files.map(fileItem => (
            <div key={fileItem.id} className="file-item">
              <div className="file-info">
                {fileItem.preview && (
                  <img 
                    src={fileItem.preview} 
                    alt={fileItem.name}
                    className="file-preview"
                  />
                )}
                <div className="file-details">
                  <div className="file-name">{fileItem.name}</div>
                  <div className="file-size">{formatFileSize(fileItem.size)}</div>
                  <div className={\`file-status status-\${fileItem.status}\`}>
                    {fileItem.status === 'pending' && 'Ready to upload'}
                    {fileItem.status === 'uploading' && 
                      \`Uploading... \${uploadProgress[fileItem.id] || 0}%\`
                    }
                    {fileItem.status === 'uploaded' && 'Upload complete'}
                    {fileItem.status === 'error' && \`Error: \${fileItem.error}\`}
                  </div>
                </div>
              </div>

              <div className="file-actions">
                {fileItem.status === 'pending' && (
                  <button 
                    onClick={() => uploadFile(fileItem)}
                    className="upload-btn"
                  >
                    Upload
                  </button>
                )}
                
                {fileItem.status === 'uploaded' && fileItem.url && (
                  <a 
                    href={fileItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View
                  </a>
                )}

                <button 
                  onClick={() => removeFile(fileItem.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>

              {fileItem.status === 'uploading' && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: \`\${uploadProgress[fileItem.id] || 0}%\` }}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="batch-actions">
            <button 
              onClick={() => files
                .filter(f => f.status === 'pending')
                .forEach(uploadFile)
              }
              disabled={!files.some(f => f.status === 'pending')}
            >
              Upload All
            </button>
            
            <button 
              onClick={() => setFiles([])}
              className="clear-all-btn"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;`}
            explanation="This file upload component includes drag-and-drop, validation, progress tracking, and preview functionality."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Form Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use controlled components for form inputs</li>
                <li>Provide immediate validation feedback</li>
                <li>Use proper form labels and accessibility attributes</li>
                <li>Handle loading and error states</li>
                <li>Validate on both client and server side</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Mix controlled and uncontrolled inputs</li>
                <li>Validate every keystroke aggressively</li>
                <li>Forget to handle form submission states</li>
                <li>Skip accessibility considerations</li>
                <li>Trust client-side validation alone</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/fundamentals/react-dom"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: React DOM
          </Link>
          
          <Link 
            href="/hooks"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: React Hooks
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}