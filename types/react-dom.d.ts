declare module "react-dom" {
  // Tipagem mínima só para o build passar
  export function useFormStatus(): { pending: boolean };
}
