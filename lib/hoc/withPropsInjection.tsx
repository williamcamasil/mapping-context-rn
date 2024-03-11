import React, { ComponentType, FunctionComponent } from 'react';

/**
 * Garante que todas as props passadas para `propsToInject` foram fornecidas durante o teste,
 * para evitar que algum prop seja esquecida, e o teste seja executado com as props injetadas
 * e não com os mocks.
 *
 * Isso é importante, pois no caso da ApiService, se o teste for executado com a API real e
 * não com o mock, pode trazer problemas de infraestrutura, devido a quantidade de requests
 * disparados.
 *
 * @param props
 * @param propsToInject
 * @param displayName
 */
function validateInjectedProps<
  Props extends {},
  InjectedProps extends {} = Partial<Props>,
>(props: Props, propsToInject: InjectedProps, displayName?: string) {
  const propsKeys = Object.keys(props);
  const injectedKeys = Object.keys(propsToInject || {});

  const allKeysProvided = injectedKeys.every(injectedKey => propsKeys.includes(injectedKey));

  if (!allKeysProvided) {
    throw new Error(`Todas as props injetadas em (${displayName}) devem ser mockadas no teste.`);
  }
}

function withPropsInjection<
  Props extends {},
  InjectedProps extends {} = Partial<Props>,
>(
  Component: ComponentType<Props>,
  propsToInject: InjectedProps,
) {
  type NonInjectedProps = Omit<Props, keyof InjectedProps> & Partial<InjectedProps>;

  const InjectedComponent = (props: Props) => {
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      validateInjectedProps(props, propsToInject, Component.displayName);
    }
    return (
      <Component {...propsToInject} {...props} />
    );
  };

  InjectedComponent.displayName = `InjectedComponent(${Component.displayName})`;

  return InjectedComponent as FunctionComponent<NonInjectedProps | {}>;
}

export default withPropsInjection;
