import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Themer from "context/Themer";

const queryClient = new QueryClient();
export function renderWithContextProviders(Component, {}) {
  return render(
    <QueryClientProvider client={queryClient}>
      <Themer>{Component}</Themer>
    </QueryClientProvider>
  );
}
