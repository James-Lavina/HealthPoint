import React, { useRef, useState } from 'react';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserRoundIcon } from
'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { useSession } from '../contexts/SessionContext';
import { sexLabels } from '../utils/format';
import type { Sex, UserInfo as UserInfoData } from '../types/session';

type Field = 'fullName' | 'age' | 'sex';
type Errors = Partial<Record<Field, string>>;
import { useScreenInit } from '../useScreenInit.js';

const sexOptions: Sex[] = ['female', 'male', 'unspecified'];

let submittedSeedUsed = false;

export function UserInfo() {
  const { user, setUser, goTo } = useSession();
  const screenInit = useScreenInit() as {submitted?: boolean;};
  const [form, setForm] = useState<UserInfoData>(user);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(() => {
    if (submittedSeedUsed || !screenInit.submitted) return false;
    submittedSeedUsed = true;
    return true;
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLDivElement>(null);

  const errors = validate(form);
  const show = (f: Field) => (submitted || touched[f]) && errors[f];

  const update = (patch: Partial<UserInfoData>) => setForm((f) => ({ ...f, ...patch }));

  const stepAge = (delta: number) => {
    const current = Number(form.age) || (delta > 0 ? 0 : 2);
    update({ age: String(Math.min(120, Math.max(1, current + delta))) });
    setTouched((t) => ({ ...t, age: true }));
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (errors.fullName) return nameRef.current?.focus();
    if (errors.age) return ageRef.current?.focus();
    if (errors.sex) return sexRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    setUser({ ...form, fullName: form.fullName.trim() });
    goTo('dashboard');
  };

  const hasErrors = submitted && Object.keys(errors).length > 0;

  return (
    <PageLayout
      title="Tell us about yourself"
      subtitle="This helps us show the right reference ranges for your readings. It only takes a moment."
      footerLeft={
      <Button variant="outline" icon={ArrowLeftIcon} onClick={() => goTo('welcome')}>
          Back
        </Button>
      }
      footerRight={
      <Button size="xl" iconRight={ArrowRightIcon} onClick={handleContinue} className="min-w-[280px]">
          Continue
        </Button>
      }>
      
      <div className="grid grid-cols-1 gap-10 2xl:grid-cols-[minmax(0,1fr)_420px] 2xl:gap-16">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleContinue();
          }}
          className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-line lg:p-12">
          
          {hasErrors &&
          <div
            role="alert"
            className="mb-10 flex items-center gap-3 rounded-xl bg-danger-light px-5 py-4 text-body font-medium text-danger-dark">
            
              <AlertCircleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Please check the highlighted fields below before continuing.
            </div>
          }

          <div className="space-y-10">
            <div>
              <label htmlFor="fullName" className="text-card font-semibold text-ink">
                Full name
              </label>
              <div className="relative mt-3">
                <UserRoundIcon
                  className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true" />
                
                <input
                  ref={nameRef}
                  id="fullName"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Maria Santos"
                  value={form.fullName}
                  maxLength={60}
                  onChange={(e) => update({ fullName: e.target.value })}
                  onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                  aria-invalid={Boolean(show('fullName'))}
                  aria-describedby="fullName-msg"
                  className={inputClass(Boolean(show('fullName')), 'h-[72px] w-full pl-14 pr-5')} />
                
              </div>
              <FieldMessage id="fullName-msg" error={show('fullName')}>
                Enter your first and last name as you'd like it on your report.
              </FieldMessage>
            </div>

            <div className="space-y-10">
              <div>
                <label htmlFor="age" className="text-card font-semibold text-ink">
                  Age
                </label>
                <div className="mt-3 flex items-center gap-3">
                  <StepperButton label="Decrease age" onClick={() => stepAge(-1)} icon="minus" />
                  <input
                    ref={ageRef}
                    id="age"
                    type="text"
                    inputMode="numeric"
                    placeholder="—"
                    value={form.age}
                    maxLength={3}
                    onChange={(e) => update({ age: e.target.value.replace(/\D/g, '') })}
                    onBlur={() => setTouched((t) => ({ ...t, age: true }))}
                    aria-invalid={Boolean(show('age'))}
                    aria-describedby="age-msg"
                    className={inputClass(
                      Boolean(show('age')),
                      'h-[72px] w-32 text-center text-[28px] font-semibold tabular-nums'
                    )} />
                  
                  <StepperButton label="Increase age" onClick={() => stepAge(1)} icon="plus" />
                  <span className="ml-1 text-body-lg text-ink-muted">years</span>
                </div>
                <FieldMessage id="age-msg" error={show('age')}>
                  Type or use + and −.
                </FieldMessage>
              </div>

              <div>
                <span id="sex-label" className="text-card font-semibold text-ink">
                  Sex
                </span>
                <div
                  ref={sexRef}
                  role="radiogroup"
                  aria-labelledby="sex-label"
                  aria-describedby="sex-msg"
                  className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  
                  {sexOptions.map((option) => {
                    const selected = form.sex === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          update({ sex: option });
                          setTouched((t) => ({ ...t, sex: true }));
                        }}
                        className={`flex h-[72px] items-center justify-center gap-3 whitespace-nowrap rounded-xl px-4 text-[18px] font-semibold transition-[background-color,color,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 active:scale-[0.98] ${
                        selected ?
                        'bg-brand-50 text-brand-deep ring-2 ring-inset ring-brand' :
                        show('sex') ?
                        'bg-white text-ink ring-2 ring-inset ring-danger' :
                        'bg-white text-ink ring-2 ring-inset ring-line hover:bg-canvas'}`
                        }>
                        
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          selected ? 'bg-brand text-white' : 'ring-2 ring-inset ring-line'}`
                          }
                          aria-hidden="true">
                          
                          {selected && <CheckIcon className="h-4 w-4" />}
                        </span>
                        {sexLabels[option]}
                      </button>);

                  })}
                </div>
                <FieldMessage id="sex-msg" error={show('sex')}>
                  Choose the option that best describes you.
                </FieldMessage>
              </div>
            </div>
          </div>
        </form>

        <aside className="self-start rounded-2xl bg-brand-50 p-8 lg:p-10">
          <ShieldCheckIcon className="h-10 w-10 text-brand-dark" aria-hidden="true" />
          <h2 className="mt-5 text-card font-semibold text-ink">Why we ask</h2>
          <p className="mt-2 text-body text-ink">
            Age and sex help us compare your readings with the reference ranges commonly used for
            people like you.
          </p>
          <ul className="mt-6 space-y-4 border-t border-brand/20 pt-6">
            <li className="flex gap-3 text-body text-ink">
              <LockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" aria-hidden="true" />
              Your details are cleared when your session ends.
            </li>
            <li className="flex gap-3 text-body text-ink">
              <ArrowLeftIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-dark" aria-hidden="true" />
              You can go back and change them at any time.
            </li>
          </ul>
        </aside>
      </div>
    </PageLayout>);

}

function validate(form: UserInfoData): Errors {
  const errors: Errors = {};
  const name = form.fullName.trim();
  if (name.length < 2) errors.fullName = 'Please enter your full name (at least 2 letters).';else
  if (!/^[\p{L}\s'.-]+$/u.test(name))
  errors.fullName = 'Names can only include letters, spaces, apostrophes, and hyphens.';
  if (!form.age) errors.age = 'Please enter your age.';else
  {
    const n = Number(form.age);
    if (!Number.isInteger(n) || n < 1 || n > 120) errors.age = 'Please enter an age between 1 and 120.';
  }
  if (!form.sex) errors.sex = 'Please choose one option.';
  return errors;
}

function inputClass(invalid: boolean, extra: string): string {
  return `rounded-xl border-2 bg-white text-[20px] text-ink placeholder:text-ink-muted/70 transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:ring-4 ${
  invalid ?
  'border-danger focus:border-danger focus:ring-danger/20' :
  'border-line focus:border-brand focus:ring-brand/20'} ${
  extra}`;
}

function FieldMessage({
  id,
  error,
  children




}: {id: string;error: string | false | undefined;children: React.ReactNode;}) {
  if (error) {
    return (
      <p id={id} className="mt-3 flex items-center gap-2 text-body font-medium text-danger-dark">
        <AlertCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {error}
      </p>);

  }
  return (
    <p id={id} className="mt-3 text-body text-ink-muted">
      {children}
    </p>);

}

function StepperButton({
  label,
  onClick,
  icon




}: {label: string;onClick: () => void;icon: 'plus' | 'minus';}) {
  const Icon = icon === 'plus' ? PlusIcon : MinusIcon;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-white text-ink ring-2 ring-inset ring-line transition-[background-color,transform] duration-150 ease-out hover:bg-canvas focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 active:scale-[0.96]">
      
      <Icon className="h-7 w-7" aria-hidden="true" />
    </button>);

}