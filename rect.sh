#!/bin/bash

make_models() {
    lower=`echo "$1" | sed 's/./\L&/g'`

    cp $HOME/project/templates/models/file.js "./src/models/$1.js"
    sed -i "s/replaceSchema/${lower}Schema/g" "./src/models/$1.js"
    sed -i "s/replaceModel/$1/g" "./src/models/$1.js"
}

make_controller() {
    lower=`echo "$1" | sed 's/./\L&/g'`

    cp $HOME/project/templates/controller/file.controller.js "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceModels/$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceModel/$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceCtrl/${lower}Ctrl/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceUpdate/update$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceAdd/add$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceGetById/get$1ById/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceGet/get$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceDelete/delete$1/g" "./src/controllers/${lower}.controller.js"
    sed -i "s/replaceId/${lower}Id/g" "./src/controllers/${lower}.controller.js"
}

make_routes() {
    lower=`echo "$1" | sed 's/./\L&/g'`

    cp $HOME/project/templates/routes/file.routes.js "./src/routes/${lower}.routes.js"
    sed -i "s/replacePath/${lower}/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceController/${lower}/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceAdd/add$1/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceUpdate/update$1/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceGet/get$1/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceGetById/get$1ById/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceDelete/delete$1/g" "./src/routes/${lower}.routes.js"
    sed -i "s/replaceId/${lower}Id/g" "./src/routes/${lower}.routes.js"
}

generate() {
    make_models $1;
    make_controller $1;
    make_routes $1;
}

case $1 in
    "make:model")
        if [ -z $2 ]
        then
            echo "ERROR: Oppsss anda lupa memberi nama filenya"
        else
            make_models $2
        fi
        ;;
    "make:controller")
        if [ -z $2 ]
        then
            echo "ERROR: Oppsss anda lupa memberi nama filenya"
        else
            make_controller $2
        fi
        ;;
    "make:route")
        if [ -z $2 ]
        then
            echo "ERROR: Oppsss anda lupa memberi nama filenya"
        else
            make_routes $2
        fi
        ;;
    "generate")
        if [ -z $2 ]
        then
            echo "ERROR: Oppsss anda lupa memberi nama filenya"
        else
            generate $2
        fi
        ;;
esac