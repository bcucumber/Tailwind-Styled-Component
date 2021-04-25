import React from 'react'
import tw from '../tailwind'
import { render } from '@testing-library/react';

interface TestCompProps extends React.PropsWithChildren<any> {
  className?: string;
  someThingElse?: string;
}

describe('tw', () => {
  it('matches snapshot with intrinsic element', () => {
    const Div = tw.div`bg-gray-400`;
    const { asFragment } = render(<Div>test</Div>);
    expect(asFragment()).toMatchSnapshot();
  })

  it('matches snapshot with function component', () => {
    const TestComp = ({ className = '', children }: TestCompProps) => <div className={className}>{children}</div>
    const TestCompStyled = tw(TestComp)`bg-gray-400`;
    const { asFragment } = render(<TestCompStyled>test</TestCompStyled>);
    expect(asFragment()).toMatchSnapshot();
  })

  it('matches snapshot with class component', () => {
    class TestComp extends React.Component<TestCompProps> {
      render() {
        return <div className={this.props.className}>{this.props.children}</div>
      }
    }
    const TestCompStyled = tw(TestComp)`bg-gray-400`;
    const { asFragment } = render(<TestCompStyled>test</TestCompStyled>);
    expect(asFragment()).toMatchSnapshot();
  })
})
