poemas = ["Amor.txt", "Ciencia.txt", "Filosofia.txt"]
contenido = ["""Arde en tus ojos un misterio, virgen
esquiva y compañera.
No sé si es odio o es amor la lumbre
inagotable de tu aliaba negra.

Conmigo irás mientras proyecte sombra
mi cuerpo y quede a mi sandalia arena.
-¿Eres la sed o el agua en mi camino?-
Dime, virgen esquiva y compañera.""",
             """Existe en matemáticas
una curva distinta a la que algunos,
los que nunca han dudado,
llaman curva de Koch.

Los perplejos en cambio han preferido
denominarla así: Copo de Nieve.""",
             """
La monotonía en los años es mas clara que el reflejo de una flor en el agua

Nos evapora los secretos , alarga la distancia
pide mas vicios para sobrevivir la guerra
aun cuando lo has perdido todo
"""]
for i in range(3):
    with open(poemas[i], mode="w", encoding="utf-8") as f:
        f.write(contenido[i])
while (True):
    eleccion = input(f"""
                Elija por favor:
                a para leer el poema de Amor,
                b para leer el poema de Ciencia,
                c para leer el poema de Filosofia,
                d para CREAR un poema usted mismo.
                e para leer un poema que usted mismo haya creado.
                """)
    opciones = {"a": "Amor.txt", "b": "Ciencia.txt", "c": "Filosofia.txt"}

    if (eleccion.lower() == "a" or eleccion.lower() == "b" or eleccion.lower() == "c"):
        with open(opciones[eleccion], mode="r", encoding="utf-8") as f:
            print(f.read())
            break
    elif eleccion.lower() == "d":
        with open("MISMO.TXT", mode="w", encoding="utf-8") as f:
            f.write(input("Ingrese por favor su poema "))
            break
    elif eleccion.lower() == "e":
        while (True):
            try:
                with open("MISMO.TXT", mode="r", encoding="utf-8") as f:
                    print(f.read())
                    break
            except:
                respuesta = input(
                    "Por favor ingresa un poema, ya que no lo has hecho")
                if (respuesta != ""):
                    with open("MISMO.TXT", mode="w", encoding="utf-8") as f:
                        f.write(respuesta)
                else:
                    continue
        break
    else:
        print("No ingresaste ningun valor valido por favor vuelve a empezar.")
